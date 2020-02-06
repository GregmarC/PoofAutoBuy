import { auth } from "../../src/firebase";

auth.onAuthStateChanged(user => {
    console.log("This is the current state of the user!: " + user)
});