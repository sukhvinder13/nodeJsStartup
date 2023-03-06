module.exports = {
    cultivation: {
        save: {
            api_url: '/i/cultivation/:type', //save all type of cultivation using dynamic API as type parameter
            api_details: 'Adding Cultivation with all types',
            routesName:'cultivation',
            modelName:'Cultivation'
        },
        saveWithImage:{
            api_url: '/i/cultivation/image/:type', //save all type of cultivation using dynamic API as type parameter
            api_details: 'Adding Cultivation data with image files',
            routesName:'imageUploader',
            modelName:'Cultivation'
        }
    },
    // pondpreparation:{
    //     saveWithImage:{
    //         api_url: '/i/pondpreparation/image/:type', //save all type of cultivation using dynamic API as type parameter
    //         api_details: 'Adding pondpreparation data with image files',
    //         routesName:'addPicture',
    //         modelName:'addPicture'
    //     }
    // },
    // create the Save API structure for all whatever u have created till now on the above format
    // as a result all will come into fall into a particular standard
}