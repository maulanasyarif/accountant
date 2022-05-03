const SkemaController = ((SET) => {

    return {
        init: () => {
            SET.__closeGlobalLoader()
        }
    }

})(SettingController)