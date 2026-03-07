/** Default configuration values for shellcn CLI. */

/** Default path where components are installed in user projects. */
export const DEFAULT_COMPONENTS_PATH = "src/components/shellcn"

/** Name of the shellcn configuration file. */
export const CONFIG_FILE_NAME = "shellcn.config.json"

/** Name of the registry manifest file. */
export const REGISTRY_FILE_NAME = "components.json"

/** Required peer dependencies for shellcn components. */
export const REQUIRED_DEPENDENCIES = ["ink", "react"] as const

/** Current version of shellcn. */
export const VERSION = "0.1.0"
