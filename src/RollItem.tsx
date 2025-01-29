export const RollItem = ({ keyValue, value }: { keyValue: any, value: number }) => {
    return (
        <div className="roll-item" key={keyValue}>
            <p>{value}</p>
        </div>
    )
}