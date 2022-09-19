import Head from 'next/head'
import Image from 'next/image'
// import { goo } from './api/arduino'

const Home = () => {


  const callback = async (i) => {
    try {
      const res = await fetch("/api/arduino"
        , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "name": "wesley",
            "job": i,
            "job2": "zion residentdfgx",
            'idv_task_id': 'env local -qwea',
            "time": Date.now()
          })
        }
      );
      const data = await res.text();
      console.log("sd", process.env.NEXT_PUBLIC_FIREBASE_API_KEY)
    } catch (error) {
    }
  };


  return (
    <div className=" mt-96">

      {/* <div class="space3d">
      <div class="box">
        <div class="front">F</div>
        <div class="back">B</div>
        <div class="top">T</div>
        <div class="bottom">BT</div>
        <div class="left">L</div>
        <div class="right">R</div>
      </div>
    </div> */}
      <div class="space-3d">
        <div class="space-3d2">
          <div class="box box1">
            <div class="cub cub1">
              <span>1</span>
              <div class="box-front">front</div>
              <div class="box-back">back</div>
              <div class="box-top">top</div>
              <div class="box-bottom">bottom</div>
              <div class="box-left">Left</div>
              <div class="box-right">right</div>
            </div>
          </div>
          <div class="box box2">
            <div class="cub cub2">
              <span>2</span>
              <div class="box-front">front</div>
              <div class="box-back">back</div>
              <div class="box-top">top</div>
              <div class="box-bottom">bottom</div>
              <div class="box-left">Left</div>
              <div class="box-right">right</div>
            </div>
          </div>
          <div class="box box3">
            <div class="cub cub3">
              <span>3</span>
              <div class="box-front">front</div>
              <div class="box-back">back</div>
              <div class="box-top">top</div>
              <div class="box-bottom">bottom</div>
              <div class="box-left">Left</div>
              <div class="box-right">right</div>
            </div>
          </div>
          <div class="box box4">
            <div class="cub cub4">
              <span>4</span>
              <div class="box-front">front</div>
              <div class="box-back">back</div>
              <div class="box-top">top</div>
              <div class="box-bottom">bottom</div>
              <div class="box-left">Left</div>
              <div class="box-right">right</div>
            </div>
          </div>
          <div class="box box5">
            <div class="cub cub5">
              <span>5</span>
              <div class="box-front">front</div>
              <div class="box-back">back</div>
              <div class="box-top">top</div>
              <div class="box-bottom">bottom</div>
              <div class="box-left">Left</div>
              <div class="box-right">right</div>
            </div>
          </div>
          <div class="box box6">
            <div class="cub cub6">
              <span>6</span>
              <div class="box-front">front</div>
              <div class="box-back">back</div>
              <div class="box-top">top</div>
              <div class="box-bottom">bottom</div>
              <div class="box-left">Left</div>
              <div class="box-right">right</div>
            </div>
          </div>
          <div class="box box7">
            <div class="cub cub7">
              <span>7</span>
              <div class="box-front">front</div>
              <div class="box-back">back</div>
              <div class="box-top">top</div>
              <div class="box-bottom">bottom</div>
              <div class="box-left">Left</div>
              <div class="box-right">right</div>
            </div>
          </div>
          <div class="box box8">
            <div class="cub cub8">
              <span>8</span>
              <div class="box-front">front</div>
              <div class="box-back">back</div>
              <div class="box-top">top</div>
              <div class="box-bottom">bottom</div>
              <div class="box-left">Left</div>
              <div class="box-right">right</div>
            </div>
          </div>
          <div class="box box9">
            <div class="cub cub9">
              <span>9</span>
              <div class="box-front">front</div>
              <div class="box-back">back</div>
              <div class="box-top">top</div>
              <div class="box-bottom">bottom</div>
              <div class="box-left">Left</div>
              <div class="box-right">right</div>
            </div>
          </div>
          <div class="box box11">
            <div class="cub cub11">
              <span>11</span>
              <div class="box-front">front</div>
              <div class="box-back">back</div>
              <div class="box-top">top</div>
              <div class="box-bottom">bottom</div>
              <div class="box-left">Left</div>
              <div class="box-right">right</div>
            </div>
          </div>
          <div class="box box12">
            <div class="cub cub12">
              <span>12</span>
              <div class="box-front">front</div>
              <div class="box-back">back</div>
              <div class="box-top">top</div>
              <div class="box-bottom">bottom</div>
              <div class="box-left">Left</div>
              <div class="box-right">right</div>
            </div>
          </div>
          <div class="box box13">
            <div class="cub cub13">
              <span>13</span>
              <div class="box-front">front</div>
              <div class="box-back">back</div>
              <div class="box-top">top</div>
              <div class="box-bottom">bottom</div>
              <div class="box-left">Left</div>
              <div class="box-right">right</div>
            </div>
          </div>
          <div class="box box14">
            <div class="cub cub14">
              <span>14</span>
              <div class="box-front">front</div>
              <div class="box-back">back</div>
              <div class="box-top">top</div>
              <div class="box-bottom">bottom</div>
              <div class="box-left">Left</div>
              <div class="box-right">right</div>
            </div>
          </div>
          <div class="box box15">
            <div class="cub cub15">
              <span>15</span>
              <div class="box-front">front</div>
              <div class="box-back">back</div>
              <div class="box-top">top</div>
              <div class="box-bottom">bottom</div>
              <div class="box-left">Left</div>
              <div class="box-right">right</div>
            </div>
          </div>
          <div class="box box16">
            <div class="cub cub16">
              <span>16</span>
              <div class="box-front">front</div>
              <div class="box-back">back</div>
              <div class="box-top">top</div>
              <div class="box-bottom">bottom</div>
              <div class="box-left">Left</div>
              <div class="box-right">right</div>
            </div>
          </div>
          <div class="box box17">
            <div class="cub cub17">
              <span>17</span>
              <div class="box-front">front</div>
              <div class="box-back">back</div>
              <div class="box-top">top</div>
              <div class="box-bottom">bottom</div>
              <div class="box-left">Left</div>
              <div class="box-right">right</div>
            </div>
          </div>
          <div class="box box18">
            <div class="cub cub18">
              <span>18</span>
              <div class="box-front">front</div>
              <div class="box-back">back</div>
              <div class="box-top">top</div>
              <div class="box-bottom">bottom</div>
              <div class="box-left">Left</div>
              <div class="box-right">right</div>
            </div>
          </div>
          <div class="box box19">
            <div class="cub cub19">
              <span>19</span>
              <div class="box-front">front</div>
              <div class="box-back">back</div>
              <div class="box-top">top</div>
              <div class="box-bottom">bottom</div>
              <div class="box-left">Left</div>
              <div class="box-right">right</div>
            </div>
          </div>
          <div class="box box21">
            <div class="cub cub21">
              <span>21</span>
              <div class="box-front">front</div>
              <div class="box-back">back</div>
              <div class="box-top">top</div>
              <div class="box-bottom">bottom</div>
              <div class="box-left">Left</div>
              <div class="box-right">right</div>
            </div>
          </div>
          <div class="box box22">
            <div class="cub cub22">
              <span>22</span>
              <div class="box-front">front</div>
              <div class="box-back">back</div>
              <div class="box-top">top</div>
              <div class="box-bottom">bottom</div>
              <div class="box-left">Left</div>
              <div class="box-right">right</div>
            </div>
          </div>
          <div class="box box23">
            <div class="cub cub23">
              <span>23</span>
              <div class="box-front">front</div>
              <div class="box-back">back</div>
              <div class="box-top">top</div>
              <div class="box-bottom">bottom</div>
              <div class="box-left">Left</div>
              <div class="box-right">right</div>
            </div>
          </div>
          <div class="box box24">
            <div class="cub cub24">
              <span>24</span>
              <div class="box-front">front</div>
              <div class="box-back">back</div>
              <div class="box-top">top</div>
              <div class="box-bottom">bottom</div>
              <div class="box-left">Left</div>
              <div class="box-right">right</div>
            </div>
          </div>
          <div class="box box26">
            <div class="cub cub26">
              <span>25</span>
              <div class="box-front">front</div>
              <div class="box-back">back</div>
              <div class="box-top">top</div>
              <div class="box-bottom">bottom</div>
              <div class="box-left">Left</div>
              <div class="box-right">right</div>
            </div>
          </div>
          <div class="box box27">
            <div class="cub cub27">
              <span>26</span>
              <div class="box-front">front</div>
              <div class="box-back">back</div>
              <div class="box-top">top</div>
              <div class="box-bottom">bottom</div>
              <div class="box-left">Left</div>
              <div class="box-right">right</div>
            </div>
          </div>
          <div class="box box28">
            <div class="cub cub28">
              <span>27</span>
              <div class="box-front">front</div>
              <div class="box-back">back</div>
              <div class="box-top">top</div>
              <div class="box-bottom">bottom</div>
              <div class="box-left">Left</div>
              <div class="box-right">right</div>
            </div>
          </div>
          <div class="box box29">
            <div class="cub cub29">
              <span>28</span>
              <div class="box-front">front</div>
              <div class="box-back">back</div>
              <div class="box-top">top</div>
              <div class="box-bottom">bottom</div>
              <div class="box-left">Left</div>
              <div class="box-right">right</div>
            </div>
          </div>
        </div>
      </div>
      {/* <a href="http://csscoke.com" class="coke">Pure CSS3 3D<br>Pocket Rubik's Cube<br><span>by CSS 可樂 / cssCoke.com</span>	</a> */}
  </div>
  )
}

export default Home
