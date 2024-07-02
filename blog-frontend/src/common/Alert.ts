import {  toast } from "react-toastify";

type alertType = "success" | "warning" | "info" | "error";

const AlertMessage = (type : alertType, message: string, autoClose: number | false | undefined = false, position?: any) =>{
    toast(message, { type, autoClose: autoClose, position: position });
}

export default AlertMessage;