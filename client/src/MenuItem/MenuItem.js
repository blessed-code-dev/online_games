import Radium from "radium";
import './MenuItem.css'

function MenuItem(props) {
    const styles = {
        height: '250px',
        width: '700px',
        textAlign: 'center',
        marginTop: '30px',
        backgroundColor: '#dbcccd',
        paddingTop: '25px',
        paddingLeft: '50px',
        borderRadius: '30px'

    }


    return (
        <div style={styles}>
            <div className='MenuItem' onClick={props.click}>
            </div>
            <div>
                <h1 style={{paddingTop: '0px'}}>{props.name}</h1>
            </div>
        </div>

    )
}

export default Radium(MenuItem)