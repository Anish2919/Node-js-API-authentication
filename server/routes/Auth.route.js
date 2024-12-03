import express from 'express'; 
const router = express.Router(); 

// REGISTER ROUTER 
router.post("/register", async(req, res, next) => {
    res.send("register route"); 
}); 

// LOGIN ROUTER 
router.post("/login", async(req, res, next) => {
    res.send("login router"); 
}); 

// REFRESH TOKEN 
router.post("/refresh-token", async(req, res, next) => {
    res.send('refreh token router'); 
}); 

// LOGOUT ROUTER 
router.delete("/logout", async(req, res, next) => {
    res.send("logout router"); 
}); 


export default router; 