import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

function SRButton(props: any) {
    const { btnValue, onClick, variant, type, bgColor, fsize, hoverBg, color, hoverColor, className, link } = props
    return (
        <>
            {link ? (
                <Link to={link}>
                    <Button variant={variant || 'contained'} type={type} className={`SRButton ${className}`} onClick={onClick} sx={{
                        backgroundColor: bgColor,
                        color: color,
                        fontSize: fsize,
                        '&hover': {
                            backgroundColor: hoverBg,
                            color: hoverColor
                        }
                    }}>{btnValue}</Button>
                </Link>
            ) : (
                <Button variant={variant || 'contained'} type={type} className={`SRButton ${className}`} onClick={onClick} sx={{
                    backgroundColor: bgColor,
                    color: color,
                    fontSize: fsize,
                    '&hover': {
                        backgroundColor: hoverBg,
                        color: hoverColor
                    }
                }}>{btnValue}</Button>
            )}
        </>
    )
}

export default SRButton
