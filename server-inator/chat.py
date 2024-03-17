import os
from dotenv import load_dotenv
import sys
import json
import google.generativeai as genai

# Load environment variables from .env file
load_dotenv()
genai.configure(api_key=os.getenv("KEY2"))
# Initialize GenerativeModel
model = genai.GenerativeModel('gemini-pro')


def gemini(input_text):
    response = model.generate_content(input_text)
    return response.text


def main():
    if len(sys.argv) != 2:
        sys.exit(1)

    arg_from_node = sys.argv[1]
    data_to_node = gemini(arg_from_node)

    print(json.dumps(data_to_node))


if __name__ == "__main__":
    main()
