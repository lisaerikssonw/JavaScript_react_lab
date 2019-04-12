import React, {Component} from 'react'

class Footer extends Component {

    render() {
        return (
            <footer className="footer">
            <div>
                <ul className="footer-container">
                    <strong className="changeColor">Support</strong>
                    <li><a href="https://www.youtube.com/watch?v=xPfiXkTOYu8" title="Contact">Contact</a></li>
                    <li><a href="https://www.youtube.com/watch?v=GXhJPey3i_A" title="FAQ">FAQ</a></li>
                </ul>
            </div>
            <div>
                <ul className="footer-container">
                    <strong className="changeColor">Corporate</strong>>
                    <li><a href="https://www.youtube.com/watch?v=kfVsfOSbJY0" title="Press">Press</a></li>
                    <li><a href="https://www.youtube.com/watch?v=PHCx4Wmj-_A" title="Privacy">Privacy</a></li>
                </ul>
            </div>
        </footer>
        )
    }

}

export default Footer