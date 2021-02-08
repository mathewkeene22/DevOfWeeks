# rake db_setup:workiversaries
namespace :db_setup do
  desc "add workiversaries"
  task workiversaries: :environment do
    ryan = User.find_by(id: 10)
    ryan.update(work_anniversary: '2005-02-28', birthday: '2000-10-16')
    nate = User.find_by(id: 6)
    nate.update(work_anniversary: '2011-05-09')
    dan = User.find_by(id: 4)
    dan.update(work_anniversary: '2013-02-11')
    mat = User.find_by(id: 1)
    mat.update(work_anniversary: '2016-09-12', birthday: '2000-10-17')
    nicole = User.find_by(id: 5)
    nicole.update(work_anniversary: '2017-12-11')
    brittany = User.find_by(id: 3)
    brittany.update(work_anniversary: '2018-01-02', birthday: '2000-03-19')
    alexandra = User.find_by(id: 2)
    alexandra.update(work_anniversary: '2018-11-06')
    chris = User.find_by(id: 8)
    chris.update(work_anniversary: '2019-10-21')
  end
end
