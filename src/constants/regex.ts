/*
 * name validation
 * accepted: letters & spaces, minimum 3 chars, maximum 15 chars
 */
export const name: RegExp = /^[\s\S]{1,}$/;
// export const name: RegExp = /[a-zA-Z ]{3,15}/;

/*
 * email validation
 */
export const email: RegExp = /^[^\s@]+@[^\s@]+\.([^\s@]{2,})+$/;


export const password: RegExp =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
