import Layout from '~/layout'
import YieldPageBorrow from '~/components/YieldsPage/indexBorrow'
import Announcement from '~/components/Announcement'
import { disclaimer } from '~/components/YieldsPage/utils'
import { getAllCGTokensList, maxAgeForNext } from '~/api'
import { getLendBorrowData } from '~/api/categories/yield'
import { compressPageProps, decompressPageProps } from '~/utils/compress'

export async function getStaticProps() {
	const data = await getLendBorrowData()

	const cgTokens = await getAllCGTokensList()

	const tokens = []
	const tokenSymbolsList = []

	cgTokens.forEach((token) => {
		if (token.symbol) {
			tokens.push({ name: token.name, symbol: token.symbol.toUpperCase(), logo: token.image })
			tokenSymbolsList.push(token.symbol.toUpperCase())
		}
	})

	const compressed = compressPageProps({ ...data.props, tokens, tokenSymbolsList })

	return {
		props: { compressed },
		revalidate: maxAgeForNext([23])
	}
}

export default function YieldBorrow({ compressed }) {
	const data = decompressPageProps(compressed)
	return (
		<Layout title={`Lend/Borrow rates - HikoDefi Yield`} defaultSEO>
			<Announcement>{disclaimer}</Announcement>
			<YieldPageBorrow {...data} />
		</Layout>
	)
}
