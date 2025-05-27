
//LIGHT
import headlightled from '../../assets/LIGHT/HEAD LIGHT LED.jpg'
import headlightround from '../../assets/LIGHT/HEAD LIGHT ROUND.jpg'
import headlight from '../../assets/LIGHT/HEAD LIGHT.jpg'
import interiorlight from '../../assets/LIGHT/INTERIOR LIGHT.jpg'

//MIRROR
import leftsidemirror from '../../assets/MIRROR/LEFTSIDEMIRROR.jpg'
import rightsidemirror from '../../assets/MIRROR/RIGHTSIDEMIRROR.jpg'
import rearmirror from '../../assets/MIRROR/REAR MIRROR.jpg'

// TYRES
import backsidetyre from '../../assets/TYRE/BACKSIDETYRE.jpg'
import pairtyre from '../../assets/TYRE/PAIRTYRES.jpg'
import tyres from '../../assets/TYRE/TYRES.webp'






// scroll image
import ImageScrollGallery from '../../components/dashboard/Scrollbarimage'

// scroll icon image --short
import CombinedScrollCard from '../../components/dashboard/Scrollicon'

//scrool image in single photo
import SingleImageCard from '../../components/dashboard/Smallcradsingleimage'





const Dashboard = () => {
	return (
		<div>
			<p>Dashboard</p>
			<div className='bg-gradient-to-r from-red-200 to-green-300'>
				{/* main div start */}




				<h1 className="font-bold text-3xl p-3">CAR SPAREPARTS</h1>
				{/* 1st GRID START */}


				
				<div className="flex  justify-center gap-8 p-4  ">
					{/* CARD 1----------------> LIGHT START */}
					<div className="bg-yellow-200  border rounded-lg shadow-md p-2 w-[250px] ">
						<h2 className="text-lg text-center font-semibold mb-2">LIGHT</h2>
						<div className="flex flex-wrap ">
							<div className="w-1/2 px-2">
								<img src={headlightled} alt="Image 1" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>HEADLIGHT LED</p>
							</div>
							<div className="w-1/2 px-2 mb-4">
								<img src={headlightround} alt="Image 2" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>HEADLIGHT ROUND</p>
							</div>
							<div className="w-1/2 px-2">
								<img src={headlight} alt="Image 3" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>HEADLIGHT</p>
							</div>
							<div className="w-1/2 px-2">
								<img src={interiorlight} alt="Image 4" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>INTERIOR LIGHT</p>
							</div>
							<div>
								<a href="https://www.google.com/search?sca_esv=a983052df2b98a8d&rlz=1C1GCEU_enIN1161IN1161&sxsrf=AE3TifPtIDvms3uGP5meIBMuYcOmx98OZQ:1748370853405&q=car+light&udm=2&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIeioyp3OhN11EY0n5qfq-zEMZldv_eRjZ2XLYc5GnVnME7glWodDcaQwvGYJtospyF9KU_GlqZnXTjKdHMkDSoriVaOqsl1BHJg0qPHBCFkkMO_z2-zedkTi4QisJPp0imefir9hyvb6u81jJR5vClt_FEEH8vkgQM7IKVP9xYhpIz6wS4Q&sa=X&ved=2ahUKEwjBpJz9pMSNAxXFxjgGHXIHPScQtKgLegQIFBAB&biw=1366&bih=641&dpr=1"
									className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded hover:bg-blue-700 transition"
								>
								see more</a>
							</div>
						</div>
					</div>
					{/* CARD 1----------------> LIGHT END */}


					{/* CARD 2----------------> MIRROR START */}

					<div className="bg-green-400  border rounded-lg shadow-md p-2 w-[250px] ">
						<h2 className="text-lg text-center font-semibold mb-2">MIRROR</h2>
						<div className="flex flex-wrap ">
							<div className="w-1/2 px-2 mb-4">
								<img src={leftsidemirror} alt="Image 1" className="w-full rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>LEFTSIDE MIRROR </p>
							</div>
							<div className="w-1/2 px-2 ">
								<img src={rightsidemirror} alt="Image 2" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>RIGHTSIDE MIRROR </p>
							</div>
							<div className="w-1/2 px-2">
								<img src={rearmirror} alt="Image 3" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>REAR MIRROR </p>
							</div>
							<div className="w-1/2 px-2">
								<img src={leftsidemirror} alt="Image 4" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>LEFTSIDE MIRROR </p>
							</div>
							<div>
								<a href="https://www.google.com/search?sca_esv=a983052df2b98a8d&rlz=1C1GCEU_enIN1161IN1161&sxsrf=AE3TifPtIDvms3uGP5meIBMuYcOmx98OZQ:1748370853405&q=car+light&udm=2&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIeioyp3OhN11EY0n5qfq-zEMZldv_eRjZ2XLYc5GnVnME7glWodDcaQwvGYJtospyF9KU_GlqZnXTjKdHMkDSoriVaOqsl1BHJg0qPHBCFkkMO_z2-zedkTi4QisJPp0imefir9hyvb6u81jJR5vClt_FEEH8vkgQM7IKVP9xYhpIz6wS4Q&sa=X&ved=2ahUKEwjBpJz9pMSNAxXFxjgGHXIHPScQtKgLegQIFBAB&biw=1366&bih=641&dpr=1"
									className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded hover:bg-blue-700 transition"
								>
									see more</a>
							</div>
						</div>
					</div>
					{/* CARD 2----------------> MIRROR END */}


					{/* CARD 3----------------> TYRE START */}

					<div className="bg-white  border rounded-lg shadow-md p-2 w-[250px] ">
						<h2 className="text-lg text-center font-semibold mb-4">TYRES </h2>
						<div className="flex flex-wrap ">
							<div className="w-1/2 px-2">
								<img src={tyres} alt="Image 1" className="w-full rounded rounded h-[145px] hover:scale-95" />
								<p className='text-center text-sm'>TYRES </p>
							</div>
							<div className="w-1/2 px-2 ">
								<img src={backsidetyre} alt="Image 2" className="w-full rounded rounded h-[145px] hover:scale-95 " />
								<p className='text-center text-sm'>BACKSIDE TYRE </p>
							</div>
							<div className="w-1/2 px-2">
								<img src={pairtyre} alt="Image 3" className="w-full rounded rounded h-[145px] hover:scale-95" />
								<p className='text-center text-sm'>PAIR TYRE </p>
							</div>
							<div className="w-1/2 px-2">
								<img src={tyres} alt="Image 4" className="w-full rounded rounded h-[145px] hover:scale-95" />
								<p className='text-center text-sm'>TYRES</p>
							</div>
							<div>
								<a href="https://www.google.com/search?sca_esv=a983052df2b98a8d&rlz=1C1GCEU_enIN1161IN1161&sxsrf=AE3TifPtIDvms3uGP5meIBMuYcOmx98OZQ:1748370853405&q=car+light&udm=2&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIeioyp3OhN11EY0n5qfq-zEMZldv_eRjZ2XLYc5GnVnME7glWodDcaQwvGYJtospyF9KU_GlqZnXTjKdHMkDSoriVaOqsl1BHJg0qPHBCFkkMO_z2-zedkTi4QisJPp0imefir9hyvb6u81jJR5vClt_FEEH8vkgQM7IKVP9xYhpIz6wS4Q&sa=X&ved=2ahUKEwjBpJz9pMSNAxXFxjgGHXIHPScQtKgLegQIFBAB&biw=1366&bih=641&dpr=1"
									className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded hover:bg-blue-700 transition"
								>
									see more</a>
							</div>
						</div>
					</div>
					{/* CARD 3----------------> TYRE END */}

					{/* CARD 4----------------> LIGHT START */}
					<div className="bg-yellow-200  border rounded-lg shadow-md p-2 w-[250px] ">
						<h2 className="text-lg text-center font-semibold mb-2">LIGHT</h2>
						<div className="flex flex-wrap ">
							<div className="w-1/2 px-2">
								<img src={headlightled} alt="Image 1" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>HEADLIGHT LED</p>
							</div>
							<div className="w-1/2 px-2 mb-4">
								<img src={headlightround} alt="Image 2" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>HEADLIGHT ROUND</p>
							</div>
							<div className="w-1/2 px-2">
								<img src={headlight} alt="Image 3" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>HEADLIGHT</p>
							</div>
							<div className="w-1/2 px-2">
								<img src={interiorlight} alt="Image 4" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>INTERIOR LIGHT</p>
							</div>
							<div>
								<a href="https://www.google.com/search?sca_esv=a983052df2b98a8d&rlz=1C1GCEU_enIN1161IN1161&sxsrf=AE3TifPtIDvms3uGP5meIBMuYcOmx98OZQ:1748370853405&q=car+light&udm=2&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIeioyp3OhN11EY0n5qfq-zEMZldv_eRjZ2XLYc5GnVnME7glWodDcaQwvGYJtospyF9KU_GlqZnXTjKdHMkDSoriVaOqsl1BHJg0qPHBCFkkMO_z2-zedkTi4QisJPp0imefir9hyvb6u81jJR5vClt_FEEH8vkgQM7IKVP9xYhpIz6wS4Q&sa=X&ved=2ahUKEwjBpJz9pMSNAxXFxjgGHXIHPScQtKgLegQIFBAB&biw=1366&bih=641&dpr=1"
									className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded hover:bg-blue-700 transition"
								>
									see more</a>
							</div>
						</div>
					</div>
					{/* CARD 4----------------> LIGHT END */}


		
				</div>
				<div className="flex  justify-center gap-8 p-4  ">
					{/* CARD 1----------------> LIGHT START */}
					<div className="bg-yellow-200  border rounded-lg shadow-md p-2 w-[250px] ">
						<h2 className="text-lg text-center font-semibold mb-2">LIGHT</h2>
						<div className="flex flex-wrap ">
							<div className="w-1/2 px-2">
								<img src={headlightled} alt="Image 1" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>HEADLIGHT LED</p>
							</div>
							<div className="w-1/2 px-2 mb-4">
								<img src={headlightround} alt="Image 2" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>HEADLIGHT ROUND</p>
							</div>
							<div className="w-1/2 px-2">
								<img src={headlight} alt="Image 3" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>HEADLIGHT</p>
							</div>
							<div className="w-1/2 px-2">
								<img src={interiorlight} alt="Image 4" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>INTERIOR LIGHT</p>
							</div>
							<div>
								<a href="https://www.google.com/search?sca_esv=a983052df2b98a8d&rlz=1C1GCEU_enIN1161IN1161&sxsrf=AE3TifPtIDvms3uGP5meIBMuYcOmx98OZQ:1748370853405&q=car+light&udm=2&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIeioyp3OhN11EY0n5qfq-zEMZldv_eRjZ2XLYc5GnVnME7glWodDcaQwvGYJtospyF9KU_GlqZnXTjKdHMkDSoriVaOqsl1BHJg0qPHBCFkkMO_z2-zedkTi4QisJPp0imefir9hyvb6u81jJR5vClt_FEEH8vkgQM7IKVP9xYhpIz6wS4Q&sa=X&ved=2ahUKEwjBpJz9pMSNAxXFxjgGHXIHPScQtKgLegQIFBAB&biw=1366&bih=641&dpr=1"
									className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded hover:bg-blue-700 transition"
								>
									see more</a>
							</div>
						</div>
					</div>
					{/* CARD 1----------------> LIGHT END */}


					{/* CARD 2----------------> MIRROR START */}

					<div className="bg-green-400  border rounded-lg shadow-md p-2 w-[250px] ">
						<h2 className="text-lg text-center font-semibold mb-2">MIRROR</h2>
						<div className="flex flex-wrap ">
							<div className="w-1/2 px-2 mb-4">
								<img src={leftsidemirror} alt="Image 1" className="w-full rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>LEFTSIDE MIRROR </p>
							</div>
							<div className="w-1/2 px-2 ">
								<img src={rightsidemirror} alt="Image 2" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>RIGHTSIDE MIRROR </p>
							</div>
							<div className="w-1/2 px-2">
								<img src={rearmirror} alt="Image 3" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>REAR MIRROR </p>
							</div>
							<div className="w-1/2 px-2">
								<img src={leftsidemirror} alt="Image 4" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>LEFTSIDE MIRROR </p>
							</div>
							<div>
								<a href="https://www.google.com/search?sca_esv=a983052df2b98a8d&rlz=1C1GCEU_enIN1161IN1161&sxsrf=AE3TifPtIDvms3uGP5meIBMuYcOmx98OZQ:1748370853405&q=car+light&udm=2&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIeioyp3OhN11EY0n5qfq-zEMZldv_eRjZ2XLYc5GnVnME7glWodDcaQwvGYJtospyF9KU_GlqZnXTjKdHMkDSoriVaOqsl1BHJg0qPHBCFkkMO_z2-zedkTi4QisJPp0imefir9hyvb6u81jJR5vClt_FEEH8vkgQM7IKVP9xYhpIz6wS4Q&sa=X&ved=2ahUKEwjBpJz9pMSNAxXFxjgGHXIHPScQtKgLegQIFBAB&biw=1366&bih=641&dpr=1"
									className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded hover:bg-blue-700 transition"
								>
									see more</a>
							</div>
						</div>
					</div>
					{/* CARD 2----------------> MIRROR END */}


					{/* CARD 3----------------> TYRE START */}

					<div className="bg-white  border rounded-lg shadow-md p-2 w-[250px] ">
						<h2 className="text-lg text-center font-semibold mb-4">TYRES </h2>
						<div className="flex flex-wrap ">
							<div className="w-1/2 px-2">
								<img src={tyres} alt="Image 1" className="w-full rounded rounded h-[145px] hover:scale-95" />
								<p className='text-center text-sm'>TYRES </p>
							</div>
							<div className="w-1/2 px-2 ">
								<img src={backsidetyre} alt="Image 2" className="w-full rounded rounded h-[145px] hover:scale-95 " />
								<p className='text-center text-sm'>BACKSIDE TYRE </p>
							</div>
							<div className="w-1/2 px-2">
								<img src={pairtyre} alt="Image 3" className="w-full rounded rounded h-[145px] hover:scale-95" />
								<p className='text-center text-sm'>PAIR TYRE </p>
							</div>
							<div className="w-1/2 px-2">
								<img src={tyres} alt="Image 4" className="w-full rounded rounded h-[145px] hover:scale-95" />
								<p className='text-center text-sm'>TYRES</p>
							</div>
							<div>
								<a href="https://www.google.com/search?sca_esv=a983052df2b98a8d&rlz=1C1GCEU_enIN1161IN1161&sxsrf=AE3TifPtIDvms3uGP5meIBMuYcOmx98OZQ:1748370853405&q=car+light&udm=2&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIeioyp3OhN11EY0n5qfq-zEMZldv_eRjZ2XLYc5GnVnME7glWodDcaQwvGYJtospyF9KU_GlqZnXTjKdHMkDSoriVaOqsl1BHJg0qPHBCFkkMO_z2-zedkTi4QisJPp0imefir9hyvb6u81jJR5vClt_FEEH8vkgQM7IKVP9xYhpIz6wS4Q&sa=X&ved=2ahUKEwjBpJz9pMSNAxXFxjgGHXIHPScQtKgLegQIFBAB&biw=1366&bih=641&dpr=1"
									className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded hover:bg-blue-700 transition"
								>
									see more</a>
							</div>
						</div>
					</div>
					{/* CARD 3----------------> TYRE END */}

					{/* CARD 4----------------> LIGHT START */}
					<div className="bg-yellow-200  border rounded-lg shadow-md p-2 w-[250px] ">
						<h2 className="text-lg text-center font-semibold mb-2">LIGHT</h2>
						<div className="flex flex-wrap ">
							<div className="w-1/2 px-2">
								<img src={headlightled} alt="Image 1" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>HEADLIGHT LED</p>
							</div>
							<div className="w-1/2 px-2 mb-4">
								<img src={headlightround} alt="Image 2" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>HEADLIGHT ROUND</p>
							</div>
							<div className="w-1/2 px-2">
								<img src={headlight} alt="Image 3" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>HEADLIGHT</p>
							</div>
							<div className="w-1/2 px-2">
								<img src={interiorlight} alt="Image 4" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>INTERIOR LIGHT</p>
							</div>
							<div>
								<a href="https://www.google.com/search?sca_esv=a983052df2b98a8d&rlz=1C1GCEU_enIN1161IN1161&sxsrf=AE3TifPtIDvms3uGP5meIBMuYcOmx98OZQ:1748370853405&q=car+light&udm=2&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIeioyp3OhN11EY0n5qfq-zEMZldv_eRjZ2XLYc5GnVnME7glWodDcaQwvGYJtospyF9KU_GlqZnXTjKdHMkDSoriVaOqsl1BHJg0qPHBCFkkMO_z2-zedkTi4QisJPp0imefir9hyvb6u81jJR5vClt_FEEH8vkgQM7IKVP9xYhpIz6wS4Q&sa=X&ved=2ahUKEwjBpJz9pMSNAxXFxjgGHXIHPScQtKgLegQIFBAB&biw=1366&bih=641&dpr=1"
									className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded hover:bg-blue-700 transition"
								>
									see more</a>
							</div>
						</div>
					</div>
					{/* CARD 4----------------> LIGHT END */}



				</div>
				<div className='bg-white'>
					
					<ImageScrollGallery/>
				</div>

				<div className="flex  justify-center gap-8 p-4  ">
					{/* CARD 1----------------> LIGHT START */}
					<div className="bg-yellow-200  border rounded-lg shadow-md p-2 w-[250px] ">
						<h2 className="text-lg text-center font-semibold mb-2">LIGHT</h2>
						<div className="flex flex-wrap ">
							<div className="w-1/2 px-2">
								<img src={headlightled} alt="Image 1" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>HEADLIGHT LED</p>
							</div>
							<div className="w-1/2 px-2 mb-4">
								<img src={headlightround} alt="Image 2" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>HEADLIGHT ROUND</p>
							</div>
							<div className="w-1/2 px-2">
								<img src={headlight} alt="Image 3" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>HEADLIGHT</p>
							</div>
							<div className="w-1/2 px-2">
								<img src={interiorlight} alt="Image 4" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>INTERIOR LIGHT</p>
							</div>
							<div>
								<a href="https://www.google.com/search?sca_esv=a983052df2b98a8d&rlz=1C1GCEU_enIN1161IN1161&sxsrf=AE3TifPtIDvms3uGP5meIBMuYcOmx98OZQ:1748370853405&q=car+light&udm=2&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIeioyp3OhN11EY0n5qfq-zEMZldv_eRjZ2XLYc5GnVnME7glWodDcaQwvGYJtospyF9KU_GlqZnXTjKdHMkDSoriVaOqsl1BHJg0qPHBCFkkMO_z2-zedkTi4QisJPp0imefir9hyvb6u81jJR5vClt_FEEH8vkgQM7IKVP9xYhpIz6wS4Q&sa=X&ved=2ahUKEwjBpJz9pMSNAxXFxjgGHXIHPScQtKgLegQIFBAB&biw=1366&bih=641&dpr=1"
									className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded hover:bg-blue-700 transition"
								>
									see more</a>
							</div>
						</div>
					</div>
					{/* CARD 1----------------> LIGHT END */}


					{/* CARD 2----------------> MIRROR START */}

					<div className="bg-green-400  border rounded-lg shadow-md p-2 w-[250px] ">
						<h2 className="text-lg text-center font-semibold mb-2">MIRROR</h2>
						<div className="flex flex-wrap ">
							<div className="w-1/2 px-2 mb-4">
								<img src={leftsidemirror} alt="Image 1" className="w-full rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>LEFTSIDE MIRROR </p>
							</div>
							<div className="w-1/2 px-2 ">
								<img src={rightsidemirror} alt="Image 2" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>RIGHTSIDE MIRROR </p>
							</div>
							<div className="w-1/2 px-2">
								<img src={rearmirror} alt="Image 3" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>REAR MIRROR </p>
							</div>
							<div className="w-1/2 px-2">
								<img src={leftsidemirror} alt="Image 4" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>LEFTSIDE MIRROR </p>
							</div>
							<div>
								<a href="https://www.google.com/search?sca_esv=a983052df2b98a8d&rlz=1C1GCEU_enIN1161IN1161&sxsrf=AE3TifPtIDvms3uGP5meIBMuYcOmx98OZQ:1748370853405&q=car+light&udm=2&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIeioyp3OhN11EY0n5qfq-zEMZldv_eRjZ2XLYc5GnVnME7glWodDcaQwvGYJtospyF9KU_GlqZnXTjKdHMkDSoriVaOqsl1BHJg0qPHBCFkkMO_z2-zedkTi4QisJPp0imefir9hyvb6u81jJR5vClt_FEEH8vkgQM7IKVP9xYhpIz6wS4Q&sa=X&ved=2ahUKEwjBpJz9pMSNAxXFxjgGHXIHPScQtKgLegQIFBAB&biw=1366&bih=641&dpr=1"
									className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded hover:bg-blue-700 transition"
								>
									see more</a>
							</div>
						</div>
					</div>
					{/* CARD 2----------------> MIRROR END */}


					{/* CARD 3----------------> TYRE START */}

					<div className="bg-white  border rounded-lg shadow-md p-2 w-[250px] ">
						<h2 className="text-lg text-center font-semibold mb-4">TYRES </h2>
						<div className="flex flex-wrap ">
							<div className="w-1/2 px-2">
								<img src={tyres} alt="Image 1" className="w-full rounded rounded h-[145px] hover:scale-95" />
								<p className='text-center text-sm'>TYRES </p>
							</div>
							<div className="w-1/2 px-2 ">
								<img src={backsidetyre} alt="Image 2" className="w-full rounded rounded h-[145px] hover:scale-95 " />
								<p className='text-center text-sm'>BACKSIDE TYRE </p>
							</div>
							<div className="w-1/2 px-2">
								<img src={pairtyre} alt="Image 3" className="w-full rounded rounded h-[145px] hover:scale-95" />
								<p className='text-center text-sm'>PAIR TYRE </p>
							</div>
							<div className="w-1/2 px-2">
								<img src={tyres} alt="Image 4" className="w-full rounded rounded h-[145px] hover:scale-95" />
								<p className='text-center text-sm'>TYRES</p>
							</div>
							<div>
								<a href="https://www.google.com/search?sca_esv=a983052df2b98a8d&rlz=1C1GCEU_enIN1161IN1161&sxsrf=AE3TifPtIDvms3uGP5meIBMuYcOmx98OZQ:1748370853405&q=car+light&udm=2&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIeioyp3OhN11EY0n5qfq-zEMZldv_eRjZ2XLYc5GnVnME7glWodDcaQwvGYJtospyF9KU_GlqZnXTjKdHMkDSoriVaOqsl1BHJg0qPHBCFkkMO_z2-zedkTi4QisJPp0imefir9hyvb6u81jJR5vClt_FEEH8vkgQM7IKVP9xYhpIz6wS4Q&sa=X&ved=2ahUKEwjBpJz9pMSNAxXFxjgGHXIHPScQtKgLegQIFBAB&biw=1366&bih=641&dpr=1"
									className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded hover:bg-blue-700 transition"
								>
									see more</a>
							</div>
						</div>
					</div>
					{/* CARD 3----------------> TYRE END */}

					{/* CARD 4----------------> LIGHT START */}
					<div className="bg-yellow-200  border rounded-lg shadow-md p-2 w-[250px] ">
						<h2 className="text-lg text-center font-semibold mb-2">LIGHT</h2>
						<div className="flex flex-wrap ">
							<div className="w-1/2 px-2">
								<img src={headlightled} alt="Image 1" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>HEADLIGHT LED</p>
							</div>
							<div className="w-1/2 px-2 mb-4">
								<img src={headlightround} alt="Image 2" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>HEADLIGHT ROUND</p>
							</div>
							<div className="w-1/2 px-2">
								<img src={headlight} alt="Image 3" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>HEADLIGHT</p>
							</div>
							<div className="w-1/2 px-2">
								<img src={interiorlight} alt="Image 4" className="w-full rounded rounded h-[120px] hover:scale-95" />
								<p className='text-center text-sm'>INTERIOR LIGHT</p>
							</div>
							<div>
								<a href="https://www.google.com/search?sca_esv=a983052df2b98a8d&rlz=1C1GCEU_enIN1161IN1161&sxsrf=AE3TifPtIDvms3uGP5meIBMuYcOmx98OZQ:1748370853405&q=car+light&udm=2&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIeioyp3OhN11EY0n5qfq-zEMZldv_eRjZ2XLYc5GnVnME7glWodDcaQwvGYJtospyF9KU_GlqZnXTjKdHMkDSoriVaOqsl1BHJg0qPHBCFkkMO_z2-zedkTi4QisJPp0imefir9hyvb6u81jJR5vClt_FEEH8vkgQM7IKVP9xYhpIz6wS4Q&sa=X&ved=2ahUKEwjBpJz9pMSNAxXFxjgGHXIHPScQtKgLegQIFBAB&biw=1366&bih=641&dpr=1"
									className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white font-medium text-sm rounded hover:bg-blue-700 transition"
								>
									see more</a>
							</div>
						</div>
					</div>
					{/* CARD 4----------------> LIGHT END */}



				</div>
				<div>
					<CombinedScrollCard/>
				</div>
				<div className='flex justify-evenly'>
					<div>
						<SingleImageCard />
					</div>
					<div>
						<SingleImageCard />
					</div>
					<div>
						<SingleImageCard />
					</div>
					<div>
						<SingleImageCard />
					</div>
					
				</div>

				{/* GRID END */}

			</div>

						{/* main div end  */}
		</div>
	);
};

export default Dashboard;
