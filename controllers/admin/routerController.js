const getAllRoutes = async(req, res) => {

    try{

        const routes = [];
        const stack = req.app._router.stack;

        stack.forEach(data => {

            if(data.name === 'router' && data.handle.stack){
                data.handle.stack.forEach((handler) => {
                    routes.push({
                        path: handler.route.path,
                        methods: handler.route.methods
                    });
                })
            }

        });

        return res.status(200).json({
            success: true,
            msg: 'All Routes!',
            data: routes
        });
        
    } catch(error){
        return res.status(400).json({
            success: false,
            msg: error.message
        });
    }

}

module.exports = {
    getAllRoutes
}