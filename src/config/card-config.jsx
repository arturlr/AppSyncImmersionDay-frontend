import { useNavigate } from "react-router-dom";
import Link  from '@cloudscape-design/components/link';
import Badge from "@cloudscape-design/components/badge";
import SpaceBetween from "@cloudscape-design/components/space-between";

export const BOOK_CARD_DEFINITIONS = () => {
    let navigate = useNavigate();
    const routeChange = (event, item) => {
        event.preventDefault();
        navigate(`/books/${item.id}`);
    };
    return {
        header: item => (
            <div>
                <Link 
                    fontSize="medium"
                    onFollow={(e) => routeChange(e, item)}
                >
                    {item.title}
                </Link>
            </div>
        ),
        sections: [
            {
                id: 'img',
                content: item => (
                    <center>
                        <img src={item.image} alt={item.img} width="40%" height="40%"/>
                    </center>
                )
            },
            {
                id: 'authorId',
                header: 'Author ID',
                content: item => item.authorId,
                width: 40
            },
            {
                id: 'publicationYear',
                header: 'Publication Year',
                content: item => item.publicationYear,
                width: 60
            },
            {
                id: 'genre',
                header: 'Genres',
                content: item => (
                    <SpaceBetween direction="horizontal" size="xs">
                        {item.genres?.map(genre => {
                            return <Badge color="blue" key={`${item.id}-${genre}`}>{genre}</Badge>
                        })}
                    </SpaceBetween>
                )
            }
        ]
    }
};

export const AUTHOR_CARD_DEFINITIONS = {

};