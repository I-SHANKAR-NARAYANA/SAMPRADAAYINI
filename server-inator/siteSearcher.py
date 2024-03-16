import sys
import json


def main():
    if len(sys.argv) != 3:
        print("Usage: python exa.py <arg>")
        sys.exit(1)

    arg_from_node = sys.argv[1]
    arg_from_node_2 = sys.argv[2]

    data_to_node = {
        0: ["col1", "col2", "col3"],
        1: ["col1", "col2", "col3"],
        2: ["col1", "col2", "col3"],
        3: ["col1", "col2", "col3"],
    }

    print(json.dumps(data_to_node))


if __name__ == "__main__":
    main()
