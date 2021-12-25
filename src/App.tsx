import React from 'react';
import MiniProfile from './components/mini-profile/MiniProfile';

function App() {
    return (
        <div className="App">
            <div style={{
                justifyContent: "center",
                display: "flex"
            }}>
                <MiniProfile
                    firstName={"Имя"}
                    lastName={"Фамилия"}
                    email={"some_test_email@gmail.com"}
                    location={"г. Томск"}
                    isGuest={false}
                    avatarLink={"https://react.semantic-ui.com/images/avatar/large/matthew.png"}
                    nickname={"andrwnv"}
                />
            </div>

        </div>
    );
}

export default App;
