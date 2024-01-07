export interface NumberCardProps{
    backgroundColor: string;
    number: number;
    description: string;
}
export function NumberCard({ backgroundColor, number, description } : NumberCardProps){
    return (
        <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12 text-center text-black">
            <div className="py-8" style={{ backgroundColor }}>
                <p className="text-2xl"><b>{number}</b></p>
                <p className="text-lg">{description}</p>
            </div>
        </div>
    );
}