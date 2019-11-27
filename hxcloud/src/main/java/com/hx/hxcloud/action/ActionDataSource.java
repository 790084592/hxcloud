package com.hx.hxcloud.action;

import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.URL;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.w3c.dom.Document;
import org.w3c.dom.Element;

import com.hx.hxcloud.entity.FileDataSourceEntity;
import com.hx.hxcloud.service.FileDataSourceService;
import com.hx.hxcloud.util.ResourceFunc;

import cn.hutool.core.util.XmlUtil;

/**
 * 数据源处理 1.跳转到数据源界面 2.跳转到文件数据源界面 3.上传数据源文件
 * 
 * @author xush
 * @since 2019年9月19日
 */
@Controller
public class ActionDataSource {

	@Autowired
	private FileDataSourceService fdsService;

	/**
	 * 跳转到数据源界面
	 * 
	 * @return
	 */
	@RequestMapping("/datasource")
	public String toDataSource() {
//		URL s = this.getClass().getResource("");
//		File file = new File(s.getPath() + "/a.xml");
//		Document document = XmlUtil.readXML(file);
//		Element element = XmlUtil.getRootElement(document);
//		List<Element> childs = XmlUtil.getElements(element, "");
//		Element child1 = XmlUtil.getElement(element, "entity");
//		Element child11 = XmlUtil.getElement(child1, "properties");
//		Element child111 = XmlUtil.getElement(child11, "property");
//		int a = 1;
		return "datasource/datasource";
	}

	/**
	 * 跳转到文件数据源界面
	 * 
	 * @return
	 */
	@RequestMapping("/datasource/filelist")
	public String toFileListFrame() {
		return "datasource/filelist";
	}

	/**
	 * 上传数据源文件
	 * 
	 * @param req
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/datasource/uploadDataSource")
	@ResponseBody
	public String uploadDataSource(HttpServletRequest req) throws Exception {
		String type = req.getParameter("type"); // 数据源类型
		String tag = req.getParameter("tag"); // 后缀名
		String account = (String) req.getSession().getAttribute("account"); // 用户账号
		InputStream in = req.getPart("file").getInputStream();
		try {
			int index;
			byte[] bytes = new byte[1024];
			String dsId = ResourceFunc.createDataSourceId(account, type); // 资源ID
			String sortPath = ResourceFunc.getFileDataSourcePath(dsId, tag); // 服务器后台存储路径
			FileOutputStream fos = new FileOutputStream(sortPath);
			try {
				while ((index = in.read(bytes)) != -1) {
					fos.write(bytes, 0, index);
					fos.flush();
				}
				FileDataSourceEntity fds = new FileDataSourceEntity(dsId, dsId, sortPath, 0, account);
				fdsService.save(fds);
			} finally {
				fos.close();
			}
		} finally {
			in.close();
		}
		return "success";
	}

	/**
	 * 查询文件数据源列表
	 * 
	 * @param req
	 * @return
	 */
	@RequestMapping("/datasource/listFileDataSource")
	@ResponseBody
	public HashMap<String, Object> listFileDataSource(HttpServletRequest req) {
		int pageIndex = Integer.parseInt(req.getParameter("pageIndex"));
		int pageSize = Integer.parseInt(req.getParameter("pageSize"));
		HashMap<String, Object> result = new HashMap<String, Object>();
		int totalCouts = fdsService.getTotalCount();
		Pageable pageable = PageRequest.of(pageIndex-1, pageSize);
		List<FileDataSourceEntity> list = fdsService.selectPlayer(null, pageable);
		result.put("total", totalCouts);
		result.put("rows", list);
		return result;
	}

}
