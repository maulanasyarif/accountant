const AgentController = ((SET) => {

    return {
        init: () => {
            SET.__closeGlobalLoader()
        }
    }

})(SettingController)