import { writeFile } from "fs/promises";

const writeJsonDataToJsonFile = async (
  data = {},
  config = {
    path: "",
  }
) => {
  if (Object.keys(data).length === 0) {
    console.log("Please provide json data");

    return;
  }
  if (!config.path) {
    console.log("Please provide a path");

    return;
  }

  try {
    const stringifiedData = JSON.stringify(data);

    await writeFile(config.path, stringifiedData, { encoding: "utf-8" });

    return null;
  } catch (error) {
    console.log(error);

    return error.message;
  }
};

export default writeJsonDataToJsonFile;
