import numpy as np
import cv2 as cv
import sys
import json
import os


def main():
    arg = sys.argv[1]
    if arg[0:8] != "Uploaded":
        response = {
            "message": "Hello from Python!",
            "argument_received": arg
        }
    allStudents = list(arg[8:].split(","))[1:]
    haar_cascade = cv.CascadeClassifier('haar_face.xml')

    people = ['1011', '1012', '1013', '1014', '1015']
    finalList = []
    # array with student ids who enrolled in course are given from node
    # Itearating each photo from meeting, if it matches with anyone with good confidence rate && his id is present in above, the id is shortlisted\
    # The shortlisted array is sent to node and node marks the attendance to them
    features = np.load('features.npy', allow_pickle=True)
    labels = np.load('labels.npy')

    face_recognizer = cv.face.LBPHFaceRecognizer_create()
    face_recognizer.read('face_trained.yml')

    folder_path = r'../Resources\Faces\val'
    for filename in os.listdir(folder_path):
        if filename.endswith('.jpg') or filename.endswith('.png'):
            img_path = os.path.join(folder_path, filename)
            img = cv.imread(img_path)
            gray = cv.cvtColor(img, cv.COLOR_BGR2GRAY)

            # Detect the face in the image
            faces_rect = haar_cascade.detectMultiScale(gray, 1.1, 4)

            for (x, y, w, h) in faces_rect:
                faces_roi = gray[y:y+h, x:x+w]
                label, confidence = face_recognizer.predict(faces_roi)
                # print(f'Image: {filename} - Label = {people[label]} with a confidence of {confidence}')
                if confidence > 75:
                    finalList.append(people[label])
                # cv.putText(img, str(people[label]), (20, 20),
                #            cv.FONT_HERSHEY_COMPLEX, 1.0, (0, 255, 0), thickness=2)
                # cv.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), thickness=2)

            # cv.imshow('Detected Face', img)
            # cv.waitKey(0)
    print(json.dumps(finalList))


if __name__ == "__main__":
    main()
