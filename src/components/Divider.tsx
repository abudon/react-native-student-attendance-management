import Blocks from "./Blocks";
import {bgcolors} from "../constants";

 const Divider = () => {
    return (
            <Blocks
                shadow
                outlined
                style={{
                    opacity: 0.5
                }}
                marginVertical={"6%"}
                color={bgcolors[0]}
                ></Blocks>
    );
};
export default Divider
