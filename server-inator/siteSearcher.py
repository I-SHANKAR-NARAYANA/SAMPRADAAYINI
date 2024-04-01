import os
from dotenv import load_dotenv
import requests
import math
import sys
import json

# Load environment variables from .env file
load_dotenv()


def calculateDistance(lat1, lon1, lat2, lon2):
    R = 6371  # Radius of the earth in km
    # Convert latitude and longitude values to float
    lat1, lon1, lat2, lon2 = map(float, [lat1, lon1, lat2, lon2])
    d_lat = math.radians(lat2 - lat1)
    d_lon = math.radians(lon2 - lon1)
    a = (
        math.sin(d_lat / 2) * math.sin(d_lat / 2) +
        math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
        math.sin(d_lon / 2) * math.sin(d_lon / 2)
    )
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    d = R * c  # Distance in km
    return d


def locate_cultural_and_heritage_sites(latitude, longitude, radius=50000):
    api_key = os.getenv("KEY")
    if api_key is None:
        print("API key not found in .env file.")
        return

    url = "https://places.googleapis.com/v1/places:searchNearby"
    headers = {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": api_key,
        "X-Goog-FieldMask": "places.displayName,places.location"
    }
    payload = {
        "includedTypes": ["hindu_temple", "art_gallery", "museum"],
        "locationRestriction": {
            "circle": {
                "center": {
                    "latitude": latitude,
                    "longitude": longitude
                },
                "radius": radius
            }
        }
    }
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 200:
        data = response.json()
        if 'places' in data:
            sites_dict = {}
            for i, site in enumerate(data['places']):
                site_name = site['displayName']['text']
                if 'location' in site:
                    site_latitude = site['location']['latitude']
                    site_longitude = site['location']['longitude']
                    distance = calculateDistance(
                        latitude, longitude, site_latitude, site_longitude)
                    sites_dict[i] = [site_name, f"{distance:.2f} km"]
                else:
                    sites_dict[i] = [site_name, "N/A"]

            # Sort the dictionary based on distance in increasing order
            sorted_sites = dict(
                sorted(sites_dict.items(), key=lambda item: float(item[1][1].split()[0])))
            return sorted_sites
        else:
            print("No places found.")
    else:
        print("Error:", response.status_code)
        print(response.text)


def main():
    if len(sys.argv) != 3:
        print("Usage: python exa.py <arg>")
        sys.exit(1)

    arg_from_node = sys.argv[1]
    arg_from_node_2 = sys.argv[2]
    radius = 50000
    sites = locate_cultural_and_heritage_sites(
        arg_from_node, arg_from_node_2, radius)
    data_to_node = sites

    print(json.dumps(data_to_node))


if __name__ == "__main__":
    main()
