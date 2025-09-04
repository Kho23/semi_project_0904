import "../css/SignUp.css";
import AcceptTab from "../components/register/AcceptTab";
import SignUpApi from "../api/SignUpApi";


const SignUp = () => {
const {users,
        setUsers,
        newUser,
        setNewUser,
        completed,
        setCompleted,
        id,
        setId,
        buttonCheck,
        setButtoncheck,
        checkMgender,
        checkFgender,
        checkDouble,
        checkEventNo,
        changeHandler,
        finishSignup,}=SignUpApi()
    
  useEffect(() => {
    localStorage.setItem("storageinfo", JSON.stringify(users)); 
  }, [users]); //JSON.stringify: 객체/배열 → 문자열(저장할 때)

  if (completed) {
    return <AcceptTab />;
  };

  return (
    <div>
      <form onSubmit={finishSignup}>
        <h1 id="title">회원정보를 입력해 주세요.</h1>
        <ul>
          <li>
            <div className="name-Class">
              <div className="name-Section">
                <label>
                  성<span className="point">*</span>
                </label>
                <input
                  type="text"
                  id="user_lastname"
                  onChange={changeHandler}
                  required
                />
              </div>
              <div className="name-Section">
                <label>
                  이름<span className="point">*</span>
                </label>
                <input
                  type="text"
                  id="user_firstname"
                  onChange={changeHandler}
                  required
                />
              </div>
            </div>
          </li>
          <li>
            <label>
              생년월일<span className="point">*</span>
              <input
                type="text"
                id="user_birth"
                size="20"
                placeholder="YYYYMMDD"
                onChange={changeHandler}
                required
              />
            </label>
          </li>
          <li>
            <label>
              성별 선택<span className="point">*</span>
            </label>
            <div className="gender-Class">
              <label>
                남자
                <input
                  type="radio"
                  name="user_gender"
                  id="user_gender_M"
                  onClick={checkMgender}
                />
                <b></b>
                여자
                <input
                  type="radio"
                  name="user_gender"
                  id="user_gender_F"
                  onClick={checkFgender}
                />
              </label>
            </div>
          </li>
          <li>
            <label>
              아이디<span className="point">*</span>
              <input
                type="text"
                id="user_id"
                size="20"
                value={id}
                onChange={(e) => {
                  setId(e.target.value);
                  changeHandler(e);
                }}
                placeholder="영문, 숫자 조합(8 ~ 12자)"
                required
              />
              <input
                type="button"
                id="doublecheck"
                value="중복확인"
                onClick={checkDouble}
              />
            </label>
          </li>
          <li>
            <label>
              비밀번호<span className="point">*</span>
              <input
                type="password"
                id="user_password"
                size="20"
                onChange={changeHandler}
                required
              />
            </label>
          </li>
          <li>
            <label>
              이메일<span className="point">*</span>
              <input
                type="email"
                id="user_email"
                size="20"
                placeholder="example@domain.com"
                required
                onChange={changeHandler}
              />
            </label>
            <div className="email-options">
              <label>
                혜택 메일 수신 안 함
                <input type="checkbox" id="event_no" onClick={checkEventNo} />
              </label>
            </div>
          </li>
          <li>
            <label>
              휴대폰 번호<span className="point">*</span>
              <input
                type="tel"
                id="user_telephone"
                size="13"
                placeholder="01000000000"
                onChange={changeHandler}
                required
              />
            </label>
          </li>
        </ul>
        <button type="submit" id="signup">
          가입하기
        </button>
        <div id="existAccount">
          이미 있는 계정이라면?
          <button id="findid">계정찾기</button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
