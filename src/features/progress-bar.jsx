export const ProgressBar = ({ group, colIdx }) => {

    const progress = group.progress[colIdx]

    return <section className="progress-display">
        <div className="progress-bar">
            {progress && progress?.Done && <div className="progress-indicator" style={{ backgroundColor: '#00c875', width: (100 * (progress.Done / group.tasks.length) + '%') }}></div>}
            {progress && progress['Working on it'] && <div className="progress-indicator" style={{ backgroundColor: '#fdab3d', width: (100 * (progress['Working on it'] / group.tasks.length) + '%') }}></div>}
            {progress && progress?.Stuck && <div className="progress-indicator" style={{ backgroundColor: '#e2445c', width: (100 * (progress.Stuck / group.tasks.length) + '%') }}></div>}
        </div>
    </section>
}