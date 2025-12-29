
export const verifyAdmin = (req, res, next) => {
    const adminKey = req.headers['x-admin-key'];
    if(adminKey === process.env.ADMIN_SECRET)
        next();
    else
        return res.status(401).json({error: "Access Denied: Invalid key"});
}
