export function Notification({message, type}) {



return (
    <>
       { message.length > 0 ?
        <section className={"notification" + (type === 'success' ? " success" : " error")}>
        <p>{message}</p>
        </section>
        : null
       }
        
    </>

);

}