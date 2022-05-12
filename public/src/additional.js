const AdditionalController = ((SET) => {

    return {
        documentation: () => {
            SET.__closeGlobalLoader()
        },
        support: () => {
            SET.__closeGlobalLoader()
        },
        contact: () => {
            SET.__closeGlobalLoader()
        },
        about: () => {
            SET.__closeGlobalLoader()
        }
    }

})(SettingController)