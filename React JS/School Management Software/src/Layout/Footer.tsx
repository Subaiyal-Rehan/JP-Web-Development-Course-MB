function Footer() {
    const year = new Date().getFullYear()
    return (
        <>
            <div className="mt-4">
                {/* <p>Icons by <a href="https://lordicon.com/" target="_blank">Lordicon</a></p> */}
                <p className="text-muted text-center">&copy; Copyrights EduEasuPro {year}. All rights reserved. Developed by <a href="https://github.com/subaiyal-rehan" className="text-muted">Subaiyal Rehan</a></p>
            </div>
        </>
    )
}

export default Footer
