export const RollItem = ({ key, value }: { key: any, value: number }) => {
    return (
        <div className="roll-item" key={key}>
            <p>{value}</p>
        </div>
    )
}