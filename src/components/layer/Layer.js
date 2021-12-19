const Layer = ({ handleToggleModal }) => {
    const mystyle = {
        position: "fixed",
        backgroundColor: "rgba(255, 255, 255, 0.4)",
        inset: "0",
        zIndex: "2",
        cursor: "pointer"
    }
    return (
        <div style={mystyle} onClick={() => handleToggleModal()}>

        </div>
    )
}
export default Layer
