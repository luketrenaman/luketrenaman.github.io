import { resume } from '@/resume'
export function ContestList(){
    return resume.contests.map((contest, i) => (
        <div key={i}>
            <p>
                {contest.name}
            </p>
            {contest.description && <p>{contest.description}</p>}
            {contest.award && <p>{contest.award}</p>}
            {contest.link && <p>{contest.link}</p>}
            <p>
                {contest.start.toDateString()} to {contest.end.toDateString()}
            </p>
        </div>
    ))
}