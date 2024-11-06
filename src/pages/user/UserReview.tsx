/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import UserReviedCard from "./UserReviedCard";
import { useAppSelector } from "../../redux/hooks";
import { useMyReviewQuery } from "../../redux/features/review/ReviewApi";
import { TReview } from "../../utils/types";
import EditReview from "./EditReview";
import EmptyReview from "./EmptyReview";

const UserReview = () => {
  const { user } = useAppSelector((state) => state.UserDetails);

  const { reviewId } = useAppSelector((state) => state.singleREviewId);

  const [reviewOpen, setReviwOpen] = useState(false);
  useEffect(() => {
    if (reviewId) {
      setReviwOpen(true);
    } else {
      setReviwOpen(false);
    }
  }, [reviewId]);
  const { data: myReview } = useMyReviewQuery(user?.user?.id);

  return (
    <div>
      {reviewOpen ? (
        <EditReview />
      ) : (
        <div>
          {myReview?.data?.length === 0 ? (
            <EmptyReview></EmptyReview>
          ) : (
            <div>
              {myReview?.data?.map((review: TReview, index: any) => (
                <UserReviedCard key={index} data={review} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserReview;
