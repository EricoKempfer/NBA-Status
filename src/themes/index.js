import { createSystem, defaultBaseConfig, defaultConfig, defaultSystem, defineConfig, mergeConfigs } from "@chakra-ui/react"
import  tokens  from "./tokens/index"
import styles from "./Styles"



const config = defineConfig({
    preflight: true,
    cssVarsPrefix: "chakra",
    cssVarsRoot: ":where(:root, :host)",
    theme: {
        tokens,
        styles
    },
})

const system = createSystem( defaultConfig, config)

export default system;