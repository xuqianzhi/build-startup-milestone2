export default function Profile() {
    const role = window.localStorage.getItem("signInType");
    const email = window.localStorage.getItem("userEmail");
    return (
        <div>
            <div> {role} </div>
            <div> {email} </div>
        </div>
    );
}