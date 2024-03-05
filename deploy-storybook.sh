BRANCH="storybook/$(date +%s)"

git switch -c $BRANCH

git push origin HEAD

git switch -

git branch -D $BRANCH

echo "🚚 배포가 완료되면 종달새에서 알려드릴게요 🎉"
