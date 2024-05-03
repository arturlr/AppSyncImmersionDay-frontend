import { useNavigate } from "react-router-dom";
import SideNavigation from "@cloudscape-design/components/side-navigation";

export function Navigation(props) {
    let navigate = useNavigate();

    return (
        <SideNavigation
            activeHref={props.activeHref}
            header={{ href: "/", text: "Discover" }}
            onFollow={event => {            
                event.preventDefault();
                navigate(event.detail.href);     
            }}
            items={[
                {
                    type: "link",
                    text: "Books",
                    href: "/books"
                }
            ]}
        />
    );
};