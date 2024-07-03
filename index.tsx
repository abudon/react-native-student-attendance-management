import 'expo-dev-client';
import Main from "./src/navigation/Main";
import {DataProvider} from "./src/hooks";
import {database} from "./src/utils/firebaseConfig";

const Index = () =>{
    return(
        <DataProvider>
            <Main/>
        </DataProvider>

    )
};
export default Index
