import Part from "./Part"
import Sum from "./Sum"


const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part =>
                <Part key={part.id} part={part}/>
            )}
            <Sum parts={parts}/>
        </div>
    )
}

export default Content