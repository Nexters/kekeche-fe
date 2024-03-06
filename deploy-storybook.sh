BRANCH="storybook/$(date +%s)"

git switch -c $BRANCH

git push origin HEAD

git switch -

git branch -D $BRANCH


echo "🚚 $BRANCH 에서 배포가 시작됐어요! 🎉"
