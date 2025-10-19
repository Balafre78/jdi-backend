import { App } from "./app";
import { Config } from "./config/config";
import { AppDataSource } from "./config/data-source";

try {
    AppDataSource.initialize()
    console.log("Data Source has been initialized!")
} catch (error) {
    console.error("Error during Data Source initialization", error)
    process.exit(1);
}

App.listen(Config.port, () => {
    console.log(`Server running on port ${Config.port}`);
});
