import { App } from "./app";
import { Config } from "./config/config";

App.listen(Config.port, () => {
    console.log(`Server running on port ${Config.port}`);
});
