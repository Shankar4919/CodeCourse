import bcrypt from 'bcrypt';

//converting plain text password to hashed password
export const hashPassword = (password) => {

    //Promise will gives us either success or error
    return new Promise((resolve, reject)=>{

        //think of salt as an strength of the hash
        bcrypt.genSalt(12, (err, salt) => {
            if(err){
                reject(err);
            }
            bcrypt.hash(password, salt, (err, hash)=>{
                if(err){
                    reject(err);
                }
                resolve(hash);
            });
        });
    });
};


// comparing hashed password to plain text password
export const comparePassword = (password, hashed) => {
    return bcrypt.compare(password, hashed);
};