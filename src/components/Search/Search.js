import { useRootContext } from "@/context/context";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { api } from "src/config";

const Search = () => {
  const router = useRouter();
	const { openSearch, toggleSearch } = useRootContext();
	const [isSearching, setSearching] = useState(false);
	const [campaignList, setCampaignList] = useState([]);

	const handleSearch = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		console.log(formData.get("query"));
		setSearching(true);
		await axios
			.request({
				method: "get",
				maxBodyLength: Infinity,
				url: `${api.BASE_URL}/web/search?query=${formData.get("query")}`,
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				console.log(res);
        setCampaignList(res.data)
			})
			.catch((err) => {
				console.error("Error:", err);
			})
			.finally(() => {
				setSearching(false);
			});
	};

  const handleClickItem = (id, type) => {
    if (type === "campaign") {
      router.replace(`/projects/${id}`);
    }
    toggleSearch();
  }

	return (
		<div className={`search-popup${openSearch ? " active" : ""}`}>
			<div onClick={toggleSearch} className="search-popup__overlay search-toggler"></div>
			<div className="search-popup__content">
				<form onSubmit={handleSearch}>
					<label htmlFor="search" className="sr-only">
						search here
					</label>
					<input type="text" name="query" id="query" placeholder="Search Here..." />
					<button type="submit" aria-label="search submit" className="thm-btn">
						{isSearching ? <Spinner animation="border" size="sm" /> : <i className="icon-magnifying-glass"></i>}
					</button>
				</form>
				<div className="search-result">
					{campaignList?.map((campaign, index) => (
							<a href={campaign.type === "campaign" ? `/projects/${campaign.id}` : campaign.type === "NEWS" ? `/news/${campaign.id}` : campaign.type === "EVENT" ? `/events/${campaign.id}` : "/"} key={index} className="search-item">
								<div className="search-item__thumb">
									<img src={`${api.RESOURCE}${campaign.image}`} alt="" />
								</div>
								<div className="search-item__content">
									<h1>{campaign.title}</h1>
								</div>
							</a>
					))}
				</div>
			</div>
		</div>
	);
};

export default Search;
