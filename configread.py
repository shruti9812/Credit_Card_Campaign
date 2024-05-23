import configparser

def read_config(config_file_path="config.ini"):
  """
  Reads configuration data from a file.

  Args:
      config_file_path (str, optional): Path to the configuration file. Defaults to "config.ini".

  Returns:
      dict: A dictionary containing configuration settings as key-value pairs.
  """
  config = configparser.ConfigParser()
  config.read(config_file_path)

  # Get configurations from DEFAULT section
  host = config.get("DEFAULT", "host")
  port = int(config.get("DEFAULT", "port"))  # Convert port to integer
  database = config.get("DEFAULT", "database")
  username = config.get("DEFAULT", "username")
  password = config.get("DEFAULT", "password")

  # Get configurations from API section (optional)
  openaiapi_key = config.get("API", "OPENAI_API_KEY")
  api_endpoint = config.get("API", "openai_endpoint")
  openai_version = config.get("API","openai_version")
  api_type = config.get("API","OpenAI_API_Type_local")

  # Return a dictionary for easier access
  return {
      "host": host,
      "port": port,
      "database": database,
      "username": username,
      "password": password,
      "OPENAI_API_KEY": openaiapi_key,
      "openai_endpoint": api_endpoint,
      "openai_version": openai_version,
      "OpenAI_API_Type_local": api_type,
  }

# Example usage
config_data = read_config()
print(f"Config data {config_data}")
#print(f"Database host: {config_data['host']}")
#print(f"API URL: {config_data['openai_endpoint']}")
#print(f"API URL: {config_data['openaiapi_key']}")


