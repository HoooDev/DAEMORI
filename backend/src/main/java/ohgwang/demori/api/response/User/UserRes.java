package ohgwang.demori.api.response.User;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import ohgwang.demori.DB.entity.Relation.UserBadge;
import ohgwang.demori.DB.entity.User;

import java.util.ArrayList;
import java.util.List;

/**
 * 회원 본인 정보 조회 API ([GET] /api/v1/users/me) 요청에 대한 응답값 정의.
 */

@Getter
@Setter
@ApiModel("UserResponse")
public class UserRes{
	private int userPk;
	@ApiModelProperty(name="User ID")
	private String userId;
	private String userName;
	private String profileUrl;
	private String nickName;
	private String badge;
	private int donation;
	private int ranking;
	private String role;

	private String address;

	private int universityPk;
	private String universityName;
	private String universityLogo;

	private List<String> bagdeList;


	public static UserRes of(User user) {
		UserRes res = new UserRes();
		res.setUserPk(user.getId());
		res.setUserId(user.getUserId());
		res.setProfileUrl(user.getProfileUrl());
		res.setUserName(user.getUsername());
		res.setBadge(user.getBadge());
		res.setNickName(user.getNickName());
		if(user.getWallet() != null){
			res.setAddress(user.getWallet().getAddress());
		}
		if(user.getUniversity() != null){
			res.setUniversityPk(user.getUniversity().getId());
			res.setUniversityLogo(user.getUniversity().getLogoUrl());
			res.setUniversityName(user.getUniversity().getUniName());
		}
		res.setDonation(user.getDonation());
		res.setRanking(user.getRanking());

		res.setRole(user.getRole());

		res.bagdeList = new ArrayList<>();
		for(UserBadge b : user.getBadgeList()){
			res.bagdeList.add(b.getBadge().getFileUrl());
		}
		return res;
	}
}