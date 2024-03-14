# exa.py

import sys
import json


def main():
    # Check if the number of command-line arguments is valid
    if len(sys.argv) != 2:
        print("Usage: python exa.py <arg>")
        sys.exit(1)

    # Extract the argument passed from Node.js
    arg_from_node = sys.argv[1]

    # Perform any processing required with the argument
    # For demonstration, let's create a dictionary to send back to Node.js
    data_to_node = {
        "message": "Hello from Python!",
        "argument_received": arg_from_node
    }

    # Convert the dictionary to JSON and print it to stdout
    print(json.dumps(data_to_node))


if __name__ == "__main__":
    main()
