import BaseLayout from "../Layout/BaseLayout";

export default function Homepage(props){
    return (
        <BaseLayout>
            <h2>Welcome to the Homepage {props.name}</h2>
            <pre>{JSON.stringify(props)}</pre>
        </BaseLayout>
    );
}