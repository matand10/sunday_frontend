export const ProgressBar = ({ group, colIdx }) => {
    const progress = group.progress.find(prog => prog.colIdx === colIdx)


    return <section className="progress-display">
        <div className="progress-bar">
            {progress && progress?.value.Done && <div className="progress-indicator" style={{ backgroundColor: '#00c875', width: (100 * (progress.value.Done / group.tasks.length) + '%') }}></div>}
            {progress && progress?.value['Working On It'] && <div className="progress-indicator" style={{ backgroundColor: '#fdab3d', width: (100 * (progress.value['Working On It'] / group.tasks.length) + '%') }}></div>}
            {progress && progress?.value.Stuck && <div className="progress-indicator" style={{ backgroundColor: '#e2445c', width: (100 * (progress.value.Stuck / group.tasks.length) + '%') }}></div>}
        </div>
    </section>
}