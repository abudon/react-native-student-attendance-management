import Main from "./src/navigation/Main";
import {DataProvider} from "./src/hooks";

const App = () =>{
    return(
        <DataProvider>
            <Main/>
        </DataProvider>

    )
};
export default App
