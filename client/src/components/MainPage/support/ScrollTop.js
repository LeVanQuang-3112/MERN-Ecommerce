import Button from '@restart/ui/esm/Button'
import { createElement, useState } from 'react'


const ScrollTopView = (props) => {
	const { onScroll, onVisbile, visible } = props

	if (typeof window === 'object') window.addEventListener('scroll', onVisbile)

	return (
		<>
			<div
				style={{
					position: 'fixed',
					bottom: 40,
					right: 30
				}} className="scroll__container">
				<Button className="btn-scroll"
                    variant="contained" color="success"
					onClick={onScroll}
					style={{ display: visible ? 'inline-block' : 'none', borderRadius: 5 }}>
					<i className="fas fa-chevron-up" style={{fontSize: "3rem"}}></i>
				</Button>
			</div>
		</>
	)
}


// index.jsx

const ScrollTop = () => {
	const [visible, setVisible] = useState(false)

	const onVisbile = () => {
		const scrolled = document.documentElement.scrollTop
		if (scrolled >= 500) setVisible(true)
		else if (scrolled <= 300) setVisible(false)
	}

	const onScroll = () => {
		if (typeof window === 'object') window.scrollTo({ top: 0, behavior: 'smooth' })
	}

	return createElement(ScrollTopView, {
		onScroll,
		onVisbile,
		visible
	})
}

export default ScrollTop;